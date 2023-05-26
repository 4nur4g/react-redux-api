import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import {
  fetchPosts,
  getUsersError,
  getUsersStatus,
  selectAllUsers,
} from '@/redux/features/users/userSlice';

const list = [
  {
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  },
  {
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  },
  {
    id: 3,
    email: 'emma.wong@reqres.in',
    first_name: 'Emma',
    last_name: 'Wong',
    avatar: 'https://reqres.in/img/faces/3-image.jpg',
  },
  {
    id: 4,
    email: 'eve.holt@reqres.in',
    first_name: 'Eve',
    last_name: 'Holt',
    avatar: 'https://reqres.in/img/faces/4-image.jpg',
  },
  {
    id: 5,
    email: 'charles.morris@reqres.in',
    first_name: 'Charles',
    last_name: 'Morris',
    avatar: 'https://reqres.in/img/faces/5-image.jpg',
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const posts = useAppSelector(selectAllUsers);
  const postStatus = useAppSelector(getUsersStatus);
  const error = useAppSelector(getUsersError);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <div className="flex flex-col h-screen place-content-center">
      <ul className="w-1/4 self-center">
        {list.map(item => (
          <li className=" bg-pinkish mb-2 p-2 rounded shadow" key={item.id}>
            {`${item.id}.`} {item.first_name} {item.last_name}
          </li>
        ))}
      </ul>
      <div className="flex w-1/2 justify-between self-center">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Prev
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Next
        </button>
      </div>
    </div>
  );
}
