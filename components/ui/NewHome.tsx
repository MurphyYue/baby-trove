import Timeline from './NewTimeLine'
import GoPostButton from './GoPostButton'
import Loading from "../Loading"
import getPublishedPostsAndMedia, { Post, PostRes } from "./action";

let loading = false;
let hasMore = true;
let data: Post[] = [];
let page = 1;
let PAGE_SIZE = 4;

async function Home() {
  loading = true;
  const res = await getPublishedPostsAndMedia({
    page,
    pageSize: PAGE_SIZE
  }) as PostRes;
  loading = false;
  data = res?.data || [];
  hasMore = res?.total > data.length;

  return (
    <>
      {data.length > 0 ? (
        <div className='min-h-full w-full pb-8'>
          <Timeline posts={data} more={hasMore} />
        </div>
      ) : (
        loading ? <Loading /> : <div className="min-h-full w-full flex items-center justify-center flex-col">
          <span className="text-xl mb-2">There are no posts</span>
          <GoPostButton />
        </div>
      )}
    </>
  )
}
export default Home;