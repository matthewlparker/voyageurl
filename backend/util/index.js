import JWT from 'jsonwebtoken';

const createJWTFromUserData = user => {
  // return jwt.sign(user.toJSON(), process.env.REACT_APP_SECRET_KEY);
  return JWT.sign(
    {
      iss: 'Lionly',
      // sub connects token with user using immutable data from user
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day
    },
    process.env.REACT_APP_SECRET_KEY
  );
};

const embeddHtmlWithJWT = req => {
  const token = createJWTFromUserData(req.user);
  return `
    <html>
      <script>
        window.localStorage.setItem('userToken', '${token}');
        window.location.href = '/lion'     
      </script>
    </html>
    `;
};

const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (header) {
    const bearer = header.split('Bearer');
    const token = bearer[1];
    JWT.verify(token, process.env.REACT_APP_SECRET_KEY, (err, authorized) => {
      if (authorized) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
  }
};

module.exports = {
  verifyToken,
  embeddHtmlWithJWT,
};
