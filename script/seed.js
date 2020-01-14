'use strict'

const db = require('../server/db')
const User = require('../server/db/models/user')
const Product = require('../server/db/models/product')
const Order = require('../server/db/models/order')

//Mock seed-data //
const ProductData = [
  {
    name: 'MacBook Pro 13',
    price: 2150,
    invoiceQuantity: 4,
    category: 'Mac',
    description:
      'MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage, and more — all in a compact 3-pound package.',
    image:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
  },
  {
    name: 'iPad Air',
    price: 599,
    invoiceQuantity: 3,
    category: 'iPad',
    description:
      'iPad Air brings more of our most powerful technologies to more people than ever. The A12 Bionic chip with Neural Engine. A 10.5‑inch Retina display with True Tone. Support for Apple Pencil and the Smart Keyboard. And at just one pound and 6.1 mm thin, carrying all that power is effortless.',
    image:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRH7lsbf9Bv74_cceHDoZCYGc_voGvn2NM9zQi2PLNT-5QgXSFzbNMx3yaQid9Pcqda3VPpWcSo_RvLvjpQuZ9o1-xVCNnJRtMUdS9NfMLKZzzmIaOD8OfV&usqp=CAc'
  },
  {
    name: 'iPhone 11 Pro',
    price: 1150,
    invoiceQuantity: 2,
    category: 'iPhone',
    description:
      'Meet the first triple‑camera system to combine cutting‑edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest‑quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQzDiFx5VrQREj0h54ipzTHTGjqXCLOecYUSbLPWS-6wlHu2zJHHhyWpvvGbr1180kC-l5kOvMjTtXPHOyIQBUYJwyFShbA0RjBmShrOqlMrXGsB_omSUNH&usqp=CAc'
  },
  {
    name: 'Apple Watch Series 5',
    price: 399,
    invoiceQuantity: 1,
    category: 'Watch',
    description:
      'This watch has a display that never sleeps. With the new Always-On Retina display, you always see the time and your watch face.',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT5ijKbP83IC1VJVl5Ddo-kzpyuWYVZezSXRA2GQ2QneT8zDDpmtgw5kLURhTGHlteiBrZs0M_1DrJM8JuhCwzbVfi13unrThFE7Tn-XeU0MGflTf3gzV67&usqp=CAc'
  },
  {
    name: 'Apple TV 4K',
    price: 179,
    invoiceQuantity: 4,
    category: 'TV',
    description:
      'Apple TV 4K lets you watch movies and shows in amazing 4K HDR and with Dolby Atmos sound.1 It has great content from apps like Amazon Prime Video, Netflix, and ESPN2 — and streaming now, original shows and movies from Apple TV+.3 You can use Siri to control it all with just your voice. And Apple TV 4K is even easier to enjoy with a reimagined Home screen and new experiences designed to make TV more immersive and personal.',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS4ihyltYplxf_X2Q1nmi-C2OACDA5vvl_FfhZkXl3pole60eoWsGud-JlsZpvS3KTAD76VwooVGflmyyeDyoIVvaKn5lkh41FBzv28FpLSNs3sVyhozu1P&usqp=CAc'
  }
]

const UserData = [
  {
    isAdmin: true,
    firstName: 'Chris P.',
    lastName: 'Bacon',
    phoneNumber: 123 - 456 - 789,
    address: '227 E 105th St. New York, NY 10022',
    email: 'Chris@gmail.com',
    password: 'mypassword'
  },
  {
    isAdmin: false,
    firstName: 'Kash',
    lastName: 'Register',
    phoneNumber: 917 - 456 - 223,
    address: '172 Madison Ave, New York, NY 10016',
    email: 'kash@gmail.com',
    password: 'hispassword'
  },
  {
    isAdmin: false,
    firstName: 'Krystal',
    lastName: 'Ball',
    phoneNumber: 217 - 443 - 221,
    address: '12 E 69th St, New York, NY 10021',
    email: 'krystal@hotmail.com',
    password: 'google123'
  },
  {
    isAdmin: true,
    firstName: 'Yolanda',
    lastName: 'Squatpump',
    phoneNumber: 204 - 987 - 777,
    address: '132 Charles St, Phoenix, AZ 85202',
    email: 'yolanda@gmail.com',
    password: 'hellowworld'
  },
  {
    isAdmin: false,
    firstName: 'Alexander',
    lastName: 'Supertramp',
    phoneNumber: 917 - 442 - 220,
    address: '1000 Broadway St, Salt Lake City, UT 70027',
    email: 'Alexander@gmail.com',
    password: 'alex123'
  }
]
const OrderData = [
  {
    status: 'processing',
    shippingMethod: 'Ground',
    paymentMethod: 'Bitcoin'
  },
  {
    status: 'cancelled',
    shippingMethod: 'Ground',
    paymentMethod: 'PayPal'
  },
  {
    status: 'shipped',
    shippingMethod: 'Ground',
    paymentMethod: 'Amex'
  },
  {
    status: 'completed',
    shippingMethod: 'Ground',
    paymentMethod: 'Visa'
  },
  {
    status: 'processing',
    shippingMethod: 'Ground',
    paymentMethod: 'Visa'
  }
]

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(
    ProductData.map(product => {
      return Product.create(product)
    })
  )
  await Promise.all(
    UserData.map(user => {
      return User.create(user)
    })
  )
  await Promise.all(
    OrderData.map(order => {
      return Order.create(order)
    })
  )
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
