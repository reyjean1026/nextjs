import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()
const { pipData } = require('./data.js');

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'Alice',
    email: 'alice@prisma.io',
    password: '12345'
  },
  {
    username: 'Nilu',
    email: 'nilu@prisma.io',
    password: '1234'
  },
]



async function main() {
  console.log(`Start seeding ...`)
  await prisma.user.deleteMany();
  console.log('Deleted records in user table');
  for (const u of userData) {
    console.log(u.password)
    if(u.password) {
      hash(u.password).then(async (val) => {
        const user = await prisma.user.create({
          data: {
            username: u.username,
            email: u.email,
            password: val.toString()
          },
    
          })
          console.log(`Created user with id: ${user.id}`)
    
       })
    }  
  }

  await prisma.pip.deleteMany();
  console.log('Deleted records in pip table');
  await prisma.pip.createMany({
    data: pipData,
  });
  console.log('Added pip data');

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })