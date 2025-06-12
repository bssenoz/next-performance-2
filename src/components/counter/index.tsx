import { GoodCounter } from './GoodCounter'
import { BadCounter } from './BadCounter'
import { memo } from 'react';

const MemoizedBadCounter = memo(BadCounter);
const MemoizedGoodCounter = memo(GoodCounter);
const Counter = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* KÖTÜ PATTERN örneği için BadCounter */}
          <MemoizedBadCounter />
          {/* İYİ PATTERN örneği için GoodCounter */}
          <MemoizedGoodCounter />
        </div>
    )
}

export default Counter


