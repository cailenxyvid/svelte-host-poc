export const handleError = (store, error) => {
    console.error(error)
    store.update(store => {
        store.errors = [...store.errors, error]
        return store
    })
    
    // clear each error after a while. probably not the best way to do this, but good UX to do something
    setTimeout(() => {
        store.update(store => {
            store.errors = [...store.errors.slice(1,store.errors.length)]
            return store
        })  
    }, 5000)
}