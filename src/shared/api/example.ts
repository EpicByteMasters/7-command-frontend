import CreateUserDto from './dto/create-user.dto';

import { userRepository } from '.';

const newUserPayload = new CreateUserDto({
  name: 'Ioan',
  email: 'Ioan@ya.ru',
  password: 'sexGod'
});

(async () => {
  const test = await userRepository.createUser(newUserPayload, '132');
})();
