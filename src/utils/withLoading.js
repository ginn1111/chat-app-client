const withLoading = async (fn) => {
  return (params, {dispatch}) => {
    dispatch(showLoading());
    try {
      return await fn(params, {dispatch})
    } catch(error) {
      throw new Error(error)
    } finally {
      dispatch(hideLoading())
    }
  }
}
