import useSWR from "swr";
import Link from "next/link";

import Layout from "../components/Layout";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPT_URL}api/list-task`;

export default function TaskPage({ staticfilteredTasks }) {
  const { data: tasks, mutate } = useSWR(spiUrl, fetcher, {
    fallbackData: staticfilteredTasks,
  });
  const filterdTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title="Task page">
      <ul>
        {staticfilteredTasks &&
          filterdTasks.map((task) => <Task key={task.id} task={task} />)}
      </ul>
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const staticfilteredTasks = await getAllTasksData();

  return {
    props: { staticfilteredTasks },
    revalidate: 3,
  };
}
