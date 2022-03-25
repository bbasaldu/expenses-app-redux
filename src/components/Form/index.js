import cls from './Form.module.css'
const Form = (props) => {
    return (
        <form className={cls.wrapper} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}
export default Form