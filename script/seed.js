'use strict'

const db = require('../server/db')
const User = require('../server/db/models/user')
const Product = require('../server/db/models/product')
const OrderProduct = require('../server/db/models/order_product')
const Order = require('../server/db/models/order')

//Mock seed-data //
const ProductData = [
  {
    id: 1,
    name: 'MacBook Pro 13',
    price: 215000,
    inventoryQty: 4,

    description:
      'MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage, and more — all in a compact 3-pound package.',
    image:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
  },
  {
    id: 2,
    name: 'Beats Studio 3',
    price: 34900,
    inventoryQty: 14,
    description:
      'NBA COLLECTION - Lakers Purple - Get closer to your music and show love for the team you rep with the Beats NBA Collection. These Beats Studio3 Wireless headphones, worn by some of your favorite players, feature your team’s authentic colors and iconic logos. The final result is a collection designed just for the fans, honoring the spirit and emotion that makes up each of the six available team options - Boston Celtics, Golden State Warriors, Houston Rockets, Los Angeles Lakers, Philadelphia 76ers, and Toronto Raptors. It’s official – the game will never sound the same. Premium sound with fine-tuned acoustics and Pure ANC Beats Studio3 Wireless headphones deliver a premium listening experience with Pure Adaptive Noise Canceling (Pure ANC) to actively block external noise and real-time audio calibration to preserve clarity, range, and emotion. They continuously pinpoint external sounds to block while automatically',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRD9PN-bWo61tw7s7BugjRCAFcFNkq5MWaOtpXdURvqQNN4pQlV6xSX4WrkIsXLGO3RXSC5aiROWYXh3SPw__D2UKzz1_y5Fa9e22LeF0tuQWoBQQVzj5gw&usqp=CAc'
  },

  {
    id: 3,
    name: 'iPhone 11 Pro',
    price: 115000,
    inventoryQty: 2,

    description:
      'Meet the first triple‑camera system to combine cutting‑edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest‑quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQzDiFx5VrQREj0h54ipzTHTGjqXCLOecYUSbLPWS-6wlHu2zJHHhyWpvvGbr1180kC-l5kOvMjTtXPHOyIQBUYJwyFShbA0RjBmShrOqlMrXGsB_omSUNH&usqp=CAc'
  },
  {
    id: 4,
    name: 'Apple TV 4K',
    price: 17900,
    inventoryQty: 4,
    description:
      'Apple TV 4K lets you watch movies and shows in amazing 4K HDR and with Dolby Atmos sound.1 It has great content from apps like Amazon Prime Video, Netflix, and ESPN2 — and streaming now, original shows and movies from Apple TV+.3 You can use Siri to control it all with just your voice. And Apple TV 4K is even easier to enjoy with a reimagined Home screen and new experiences designed to make TV more immersive and personal.',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS4ihyltYplxf_X2Q1nmi-C2OACDA5vvl_FfhZkXl3pole60eoWsGud-JlsZpvS3KTAD76VwooVGflmyyeDyoIVvaKn5lkh41FBzv28FpLSNs3sVyhozu1P&usqp=CAc'
  },
  {
    id: 5,
    name: 'New iMac Pro 27"',
    price: 129900,
    inventoryQty: 17,
    description:
      'The vision behind iMac has never wavered: Transform the desktop experience by fitting powerful, easy-to-use technology into an elegant, all-in-one design. The new iMac takes that idea to the next level — giving you even more amazing tools to do just about anything. iMac is packed with the latest processors, faster memory, and phenomenal graphics. All coming to life on the brightest, most vibrant Retina display ever on a Mac. It’s the total package — powered up.',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQF3gCfuZJuTScN_0QN2T-RbMikBLSWqxj_OhcDmhCjYxZhgn6Gz32ab8A8EE6oBGEKUma0bI0__lHUnNYyqPQJPo2sdxuF0W0kQ8KscEVQPzgdP2Dar-sV0g&usqp=CAc'
  },
  {
    id: 6,
    name: "John's AirPods Pro",
    price: 24900,
    inventoryQty: 45,
    description:
      'Magic like you’ve never heard AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case. Active Noise Cancellation Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and call.',
    image:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmNLSUUKcueVeU0bIkMVLTkCQ5z-v1OTUNOPNFaeOMKxy8QBeX28rNNNe_PLMNmtnhbabOFjO4_1UB-P3xXHt8tccxM0A3FCqSxhNb_7gpZGCq_PWoUTly&usqp=CAc'
  },
  {
    id: 7,
    name: 'iPad Pro',
    price: 99900,
    inventoryQty: 24,
    description:
      'It’s all screen and all powerful. It’s all screen and all powerful. Completely redesigned and packed with our most advanced technology, it will make you rethink what iPad is capable of.',
    image:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRpiEg8f3wUsZp2Gzcakh2jpiBbNZ1m5RLSsNUFjOHg8uWqDiYt6DToYvhC3aHNKveIR-lG4kJd5jrsr8pKni-pq0cWIiDOGHIGVaCzoMUgYPC79M3aPsKc&usqp=CAc'
  },
  {
    id: 8,
    name: 'iPad Air',
    price: 59900,
    inventoryQty: 3,
    description:
      'iPad Air brings more of our most powerful technologies to more people than ever. The A12 Bionic chip with Neural Engine. A 10.5‑inch Retina display with True Tone. Support for Apple Pencil and the Smart Keyboard. And at just one pound and 6.1 mm thin, carrying all that power is effortless.',
    image:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRH7lsbf9Bv74_cceHDoZCYGc_voGvn2NM9zQi2PLNT-5QgXSFzbNMx3yaQid9Pcqda3VPpWcSo_RvLvjpQuZ9o1-xVCNnJRtMUdS9NfMLKZzzmIaOD8OfV&usqp=CAc'
  },
  {
    id: 9,
    name: 'Apple Watch Series 5',
    price: 39900,
    inventoryQty: 1,

    description:
      'This watch has a display that never sleeps. With the new Always-On Retina display, you always see the time and your watch face.',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT5ijKbP83IC1VJVl5Ddo-kzpyuWYVZezSXRA2GQ2QneT8zDDpmtgw5kLURhTGHlteiBrZs0M_1DrJM8JuhCwzbVfi13unrThFE7Tn-XeU0MGflTf3gzV67&usqp=CAc'
  }
]

const UserData = [
  {
    isAdmin: true,
    firstName: 'Chris P.',
    lastName: 'Bacon',
    phoneNumber: '123456789',
    address: '227 E 105th St. New York, NY 10022',
    email: 'Chris@gmail.com',
    password: 'mypassword'
  },
  {
    isAdmin: false,
    firstName: 'Kash',
    lastName: 'Register',
    phoneNumber: '917 - 456 - 223',
    address: '172 Madison Ave, New York, NY 10016',
    email: 'kash@gmail.com',
    password: 'hispassword'
  },
  {
    isAdmin: false,
    firstName: 'Krystal',
    lastName: 'Ball',
    phoneNumber: '217 - 443 - 221',
    address: '12 E 69th St, New York, NY 10021',
    email: 'krystal@hotmail.com',
    password: 'google123'
  },
  {
    isAdmin: true,
    firstName: 'Yolanda',
    lastName: 'Squatpump',
    phoneNumber: '04 - 987 - 777',
    address: '132 Charles St, Phoenix, AZ 85202',
    email: 'yolanda@gmail.com',
    password: 'hellowworld'
  },
  {
    isAdmin: false,
    firstName: 'Alexander',
    lastName: 'Supertramp',
    phoneNumber: '917 - 442 - 220',
    address: '1000 Broadway St, Salt Lake City, UT 70027',
    email: 'Alexander@gmail.com',
    password: 'alex123'
  }
]
const OrderData = [
  {
    purchased: true,
    paymentMethod: 'Bitcoin',
    userId: 1
  },
  {
    purchased: false,
    paymentMethod: 'PayPal',
    userId: 2
  },
  {
    purchased: true,
    paymentMethod: 'Amex',
    userId: 2
  },
  {
    purchased: false,
    paymentMethod: 'Visa',
    userId: 3
  },
  {
    purchased: true,
    paymentMethod: 'Visa',
    userId: 3
  }
]

const OrderProductData = [
  {orderId: 1, productId: 2, productQty: 2, productPrice: 34900},
  {orderId: 2, productId: 2, productQty: 1, productPrice: 34900},
  {orderId: 2, productId: 3, productQty: 1, productPrice: 115000},
  {orderId: 3, productId: 4, productQty: 3, productPrice: 17900},
  {orderId: 3, productId: 5, productQty: 2, productPrice: 129900},
  {orderId: 4, productId: 1, productQty: 1, productPrice: 215000}
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
  await Promise.all(
    OrderProductData.map(product => {
      return OrderProduct.create(product)
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
