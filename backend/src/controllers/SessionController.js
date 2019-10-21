// index, show, store, update, destroy

//index = listagem de sessões, show = única sessão, store = criar uma sessão
//update = alterar uma sessão, destroy = destruir/remover uma sessão 
const User = require('../models/User');

module.exports = {
    async store(req, res){
        //const email = req.body.email;
        const {email} = req.body;

        let user = await User.findOne({ email: email});
        if (!user){
            user = await User.create({ email });
        }
      
        
        return res.json(user);
    }
};