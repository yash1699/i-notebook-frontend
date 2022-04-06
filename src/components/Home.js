import Notes from "./Notes";

const Home = (props) => {
    return (
        <div>
            <Notes setProgress={props.setProgress}/>
        </div>
    )
}

export default Home
