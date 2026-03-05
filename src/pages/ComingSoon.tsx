import { Link } from "react-router-dom";
import Empty from "@/components/Empty";
import { Button } from "@/components/Button";

export default function ComingSoon() {
  return (
    <Empty
      title="敬请期待"
      description="这个页面还在打磨中。你可以先去浏览新品与热销商品。"
      action={
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button size="md">返回首页</Button>
          </Link>
          <Link to="/products">
            <Button variant="secondary" size="md">
              去逛商品
            </Button>
          </Link>
        </div>
      }
    />
  );
}

