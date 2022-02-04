import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const ScrollToTop = () => {

  const { pathname } = useLocation();
  const page = useSelector(state => state.page);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, page]);

  return null;
}

export default ScrollToTop;
