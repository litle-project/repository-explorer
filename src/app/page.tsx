'use client'

import Layout from "@/app/layout"
import Image from "next/image"
import Button from "@/components/Button"
import Empty from "@/components/Empty"
import Input from "@/components/Input"
import { useState, useEffect } from "react"

const Page = () => {
  interface IBusy {
    status: boolean,
    message: string
  }

  interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    forks_count: number;
  }

  interface GithubUser {
    id: number;
    login: string;
  }

  interface GithubResponse {
    incomplete_results: string;
    items: Array<GithubUser>;
    total_count: number;
  }

  interface IRepo {
    id: number,
    name: string,
    description: string,
    totalFork: number
  }

  interface IUser {
    id: number,
    name: string,
    repos: Array<IRepo>
  }

  const baseURL = process.env.NEXT_PUBLIC_GITHUB_API_URL;
  const [username, setUsername] = useState<string>('')
  const [users, setUsers] = useState<Array<IUser>>([])
  const [showDetail, setShowDetail] = useState<number>(0)
  const [hasSearch, setHasSearch] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState<IBusy>({
    status: false,
    message: ''
  })

  const findRepo = async () => {
    setBusy((prev) => ({ ...prev, message: 'Now, fetching repository on progress...' }))
    
    const fetchRepo = users.map((user: IUser) => fetch(`${baseURL}/users/${user.name}/repos`).then((response) => response.json()))
    await Promise.all(fetchRepo).then((results) => {
      results.forEach((items: GitHubRepo[], index: number) => {
        const remap: IRepo[] = items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          totalFork: item.forks_count || 0,
        }));
    
        users[index].repos.push(...remap);
      });
    });
    
    setBusy({ status: false, message: '' })
  }

  const findUser = async (param = '') => {
    if (username === '' || param === '') return setError('Please insert username!')
    
    setBusy({ status: true, message: 'Please wait while searching username...' })
    
    const query = new URLSearchParams({ q: username, per_page: "5" })
    const request = await fetch(`${baseURL}/search/users?${query.toString()}`,)
    const responses: GithubResponse = await request.json()
    
    const remap = responses?.items?.map((response: GithubUser) => ({
      id: response.id,
      name: response.login,
      repos: []
    })) || []

    setUsers(remap)
    setError('')
    
    if (remap.length > 0) setBusy((prev) => ({ ...prev, message: 'Username fetched' }))
    else setBusy({ status: false, message: '' })
    
    if (!hasSearch) setHasSearch(true)
  }

  useEffect(() => {
    if (users.length > 0) findRepo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])
 
  return (
    <Layout>
      <div className="flex justify-center w-full bg-white">
        <div className="flex flex-col gap-3 py-5 px-2 w-1/2 bg-gray-100 h-full min-h-lvh">
          <Input
            placeholder="Enter username"
            error={error}
            handler={(value: string) => setUsername(value)}
            eventKey={(value: string) => findUser(value)}
          />
          <Button
            label={busy.status ? busy.message : 'Search'}
            handler={() => findUser()}
            loading={busy}
          />
          <div className="flex flex-col gap-2">
            {users.length > 0 ? users.map((user: IUser) => (
              <div className="flex flex-col gap-2" key={user.id}>
                <button
                  onClick={() => setShowDetail(showDetail === user.id ? 0 : user.id)}
                  className="bg-gray-200 p-2.5 flex justify-between items-center cursor-pointer"
                >
                  <span>{user.name}</span>
                  <Image
                    src={showDetail === user.id ? "/assets/images/arrow-up.svg" : "/assets/images/arrow-down.svg"}
                    alt="arrow_down"
                    width={25}
                    height={25}
                  />
                </button>
                <div className={`pl-5 flex-col gap-2 ${showDetail === user.id ? 'flex' : 'hidden'}`}>
                  {user.repos.map((repo: IRepo) => (
                    <div className="p-2.5 bg-gray-300" key={repo.id}>
                      <div className="flex justify-between items-center font-bold">
                        <span>{repo.name}</span>
                        <div className="flex gap-2 items-center">
                          <span>{repo.totalFork}</span>
                          <Image
                            src="/assets/images/favorite.svg"
                            alt="arrow_down"
                            width={18}
                            height={18}
                          />
                        </div>
                      </div>
                      <p className="text-sm">{repo?.description || '-'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )) : (hasSearch && <Empty />)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page