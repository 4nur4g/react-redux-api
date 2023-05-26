import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import {
  fetchPosts,
  getUsersError,
  getUsersStatus,
  selectAllUsers,
} from '@/redux/features/users/userSlice';
import * as React from 'react';

export default function Home() {
  const [pageNo, setPageNo] = useState(1);

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const posts = useAppSelector(selectAllUsers);
  const postStatus = useAppSelector(getUsersStatus);
  const error = useAppSelector(getUsersError);

  useEffect(() => {
    console.log('Inside use effect');
    if (postStatus !== 'loading') {
      dispatch(fetchPosts(pageNo));
    }
  }, [pageNo, dispatch]);

  return (
    <div className="h-screen flex flex-col justify-center gap-2">
      {postStatus === 'loading' ? (
        <p className="flex flex-col place-content-center text-center h-[240px]">
          Loading...
        </p>
      ) : postStatus === 'failed' ? (
        <p className="flex flex-col place-content-center text-center h-[240px]">
          {error}
        </p>
      ) : postStatus === 'succeeded' ? (
        <div className="flex flex-col place-content-center h-[240px] ">
          <ul className="w-1/4 self-center h-[240px]">
            {users.map(item => (
              <li className=" bg-pinkish mb-2 p-2 rounded shadow" key={item.id}>
                {`${item.id}.`} {item.first_name} {item.last_name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="flex flex-col align-middle justify-center">
        <div className="flex w-1/2 justify-between self-center">
          <button
            onClick={() => {
              pageNo > 1 && setPageNo(pageNo - 1);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
          <button
            onClick={() => setPageNo(pageNo + 1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
