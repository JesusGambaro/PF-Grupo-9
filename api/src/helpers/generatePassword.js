module.exports = {
     generatePassword: () => {
          return Math.random().toString(32).substring(2)
     },
}
   