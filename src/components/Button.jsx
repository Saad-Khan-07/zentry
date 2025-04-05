
export default function Button(props) {
  return (
    <button id={props.id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full  px-7 py-3 text-black
    ${props.containerClass}`}>
        {props.leftIcon}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
            <div>
                {props.title}
            </div>
        </span>
        {props.rightIcon}
    </button>
  )
}
