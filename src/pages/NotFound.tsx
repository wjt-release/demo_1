import { Link } from "react-router-dom";
import Empty from "@/components/Empty";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <Empty
      title="页面不存在"
      description="你访问的页面可能已被移动或暂未上线。"
      action={
        <Link to="/">
          <Button size="md">返回首页</Button>
        </Link>
      }
    />
  );
}

