module.exports = {

  success: data => ({
    message: 'Some message',
    payload: data
  }),

  error: message => ({
    errorMessage: message
  })

};