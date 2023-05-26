import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import {
  fetchPosts,
  getUsersError,
  getUsersStatus,
  selectAllUsers,
  getAvailablePageData,
  pageDataAdded,
} from '@/redux/features/users/userSlice';
import * as React from 'react';

type arraylist = number[];

export default function Home() {
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const availableData = useAppSelector(getAvailablePageData);

  const posts = useAppSelector(selectAllUsers);
  const postStatus = useAppSelector(getUsersStatus);
  const error = useAppSelector(getUsersError);

  useEffect(() => {
    if (postStatus !== 'loading') {
      if (availableData.includes(pageNo)) {
      } else {
        dispatch(pageDataAdded(pageNo));
        dispatch(fetchPosts(pageNo));
      }
    }
  }, [pageNo, dispatch]);

  return (
    <div className="h-screen w-screen flex flex-col items-center content-center justify-center">
      <div className="flex align-middle justify-center h-[15rem]">
        {postStatus === 'succeeded' && (
          <ul className="h-[15rem] w-64 ">
            {users.map(item => (
              <li className="bg-pinkish mb-2 p-2 rounded shadow" key={item.id}>
                {`${item.id}.`} {item.first_name} {item.last_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-between w-1/2 ">
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
  );
}
