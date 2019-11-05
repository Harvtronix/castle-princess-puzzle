const logReducer = (state, entry) => {
    const result = [...state, entry]
    if (result.length > 200){
        result.shift()
    }
    return result;
}

export default logReducer
