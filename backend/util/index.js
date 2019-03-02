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
        window.location.href = '/lion/${req.user.username
          .split(' ')
          .join('')
          .toLowerCase()}'
      </script>
    </html>
    `;
};

module.exports = {
  embeddHtmlWithJWT,
};
