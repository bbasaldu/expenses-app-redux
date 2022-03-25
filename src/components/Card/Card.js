import cls from './Card.module.css'
const Card = (props) => {
    return (
        <div className={cls.wrapper}>
            {props.children}
        </div>
    )
}
export default Card