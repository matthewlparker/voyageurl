import jwt from 'jsonwebtoken';

const createJWTFromUserData = user => {
  return jwt.sign(user.toJSON(), process.env.REACT_APP_SECRET_KEY);
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

// window.location.href = '/lion/${req.user.username
//   .split(' ')
//   .join('')
//   .toLowerCase()}'

const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (header) {
    const bearer = header.split('Bearer');
    const token = bearer[1];
    jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, authorized) => {
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
