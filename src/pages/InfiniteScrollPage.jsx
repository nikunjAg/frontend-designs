import { useCallback, useEffect, useState } from "react";

import InfiniteScroll from "../components/InfiniteScroll";
import Post from "../components/Post/Post";
import useThrottle from "../hooks/useThrottle";
import Stepper from "../components/Stepper/Stepper";

const fetchData = async (skip = 0, limit = 10) => {
	const res = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`);
	const data = await res.json();
	return {
		data: data.posts,
		total: data.total,
		skip: data.skip,
		limit: data.limit,
	};
};

const InfiniteScrollPage = () => {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState({
    data: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

  const fetchDataHandler = useCallback(async (skip, limit) => {
    setLoading(true);
    const res = await fetchData(skip, limit);
    setLoading(false);
    setList(prev => ({ ...res, data: prev.data.concat(res.data)}));
  }, []);

  const throttledFetchDataHandler = useThrottle(fetchDataHandler, 2000);

  const fetchMoreDataHandler = useCallback(() => {
    const { skip, limit, total } = list;

    if (total === skip + limit) return;

    throttledFetchDataHandler(skip + limit, limit);
  }, [throttledFetchDataHandler, list]);

  useEffect(() => {
    fetchDataHandler(0);
  }, [fetchDataHandler]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }} >

      <Stepper />
      <div style={{ boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.06)', textAlign: 'center', padding: '6px' }} >
        <h3><u>Features</u></h3>
        <ul>
          <li>Uses real-world <b>Paginated API</b> to simulate Infinite Scroll.</li>
          <li>As we reach <b>near the bottom of scroll</b> an API call is made to <b>fetch data from next page.</b></li>
          <li>Used <b>throttling</b>(custom-hook with <b>2s time-limit</b>) along with <b>useCallback</b> to <b>limit the API calls</b>.</li>
          <li>Made <b>Reusable Infinite Scroll Component</b> to render <b>any UI element</b> with <b>configurable distance</b> to make API call near the end.</li>
        </ul>
      </div>
      <InfiniteScroll
        list={list}
        loading={loading}
        before={500}
        render={(element) => <Post key={element.id} {...element} />}
        onFetchData={fetchMoreDataHandler}
      />
    </div>
	);
}

export default InfiniteScrollPage;