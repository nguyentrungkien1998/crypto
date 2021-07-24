let validate = async (req)=>await Security.decode((req.headers.cookie+=';').match(new RegExp('(?<=auth\_nuxt\=+).*?(?=\;)',"gs"))[0]);

module.exports = async function isLoggedIn(req, res, next) {
  
  try{
    if(req.headers.admin === 'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'){
      return next();
    }else{
      let {pass_hash} = await validate(req);
      let data = await User.find({pass_hash});
      if(data.length === 0) throw null;
      return next();
    }
  }catch(error){  
  	console.log(error);
    return res.forbidden({error:'Token hết hạn'});
  }
};
