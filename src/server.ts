import app from './app';
import 'dotenv/config';

async function main() {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`App listening on port ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
