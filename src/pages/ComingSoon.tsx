import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-6">{title}</h1>
      <p className="text-lg text-gray-500 max-w-md mb-10">
        该页面正在精心打造中，敬请期待更多精彩内容。
      </p>
      <Link to="/">
        <Button variant="primary" size="lg" className="px-10">
          返回首页
        </Button>
      </Link>
    </div>
  );
};
