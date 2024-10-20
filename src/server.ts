import { app } from './app';

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server started on port ${app.get('port')}`);
});
