import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import {
  getUsersError,
  getUsersStatus,
  selectAllUsers,
  getAvailablePageData,
  pageDataAdded,
  getDataLimit,
  fetchUsers,
} from '@/redux/features/users/userSlice';
import Link from 'next/link';

export default function Home() {
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const availableData = useAppSelector(getAvailablePageData);
  const userStatus = useAppSelector(getUsersStatus);
  const error = useAppSelector(getUsersError);

  const dataLimit = useAppSelector(getDataLimit);

  useEffect(() => {
    if (userStatus !== 'loading') {
      if (availableData.includes(pageNo)) {
      } else {
        dispatch(pageDataAdded(pageNo));
        dispatch(fetchUsers(pageNo));
      }
    }
  }, [pageNo]);

  return (
    <div className=" flex flex-col items-center content-center justify-center gap-2">
      <h1 className="self-start text-3xl text-pinkish font-bold">
        The user list
      </h1>
      <div className="flex align-middle justify-center text-slate-800 ">
        {error && (
          <div className="flex place-items-center justify-center bg-slate-800 rounded-2xl text-2xl text-white font-medium p-20">
            {'Error loading data'}
          </div>
        )}
        {users.length > 0 && (
          <ul className=" w-64 ">
            {users.map(item => (
              <Link
                className="font-medium"
                key={item.id}
                href={`/details/${item.id}`}
              >
                <li className="bg-pinkish mb-2 p-2 rounded shadow hover:cursor-pointer">
                  {`${item.id}.`} {item.first_name} {item.last_name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>

      {dataLimit.limit != null && users.length < dataLimit.limit! && (
        <button
          onClick={() => setPageNo(pageNo + 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}
