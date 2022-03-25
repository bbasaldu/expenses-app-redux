import cls from './Input.module.css'
const Input = (props) => {
    return (
        <div className={cls.container}>
            <input type={"text"}>{props.children}</input>
        </div>
    )
}
export default Input