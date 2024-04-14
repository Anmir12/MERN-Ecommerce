
const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;




interface PropsSkelton{
  width?:string;
  length?:number;
}
export const Skeltonloader = ({width ="unset",length=3}:PropsSkelton) => {

 const skeletons = Array.from({length},(_,idx)=><div key={idx} className="skeleton-shape" style={{ width }}></div>)
  return (
    <div className="skeleton-loader" >
        {skeletons }
    </div>
  )
}

