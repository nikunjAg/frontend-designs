import { useCallback, useRef } from "react"

function useThrottle(fn, limit) {

    const inThrottle = useRef();

    return useCallback(function(...args) {

        if (inThrottle.current) {
            return;
        }

        const that = this;
        inThrottle.current = true;
        return Promise.resolve(fn.call(that, ...args))
            .then(res => {
                return res;
            })
            .finally(() => {
                setTimeout(() => {
                    inThrottle.current = false;
                }, limit);
            });
    }, [fn, limit]);
}

export default useThrottle;