const Rank = (props) => {
    const {rank, name} = props;
    return(
        <div>
            <div className="white f3">
                {`${name}, your current entry rank is...`}
            </div>
            <div className="white f2">
                {rank}
            </div>
        </div>
    )
}

export default Rank;