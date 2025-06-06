# Mandelfield
The Mandelbrot set fractal colorfully drawn with an animated vector field.

Khan Academy release can be found [here](https://www.khanacademy.org/cs/z/6240242778685440).\
GitHub release can be found [here](https://zushah.github.io/mandelfield/).

Powered by [Chalkboard v2.1.0 Seki](https://www.github.com/Zushah/Chalkboard).

The vector field is adapated from ["Mandelbrot set"](https://anvaka.github.io/fieldplay/?dt=0.004&fo=0.998&dp=0.009&cm=3&cx=-0.5670999999999999&cy=-0.07010000000000005&w=4.9916&h=4.9916&pc=30000&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20vec2%20z%20%3D%20p%3B%0Afor%28int%20k%3D0%3B%20k%3C50%3B%20k%2B%2B%29%20%7B%0Az%20%3D%20vec2%28z.x%20*%20z.x%20-%20z.y%20*%20z.y%2C%202.%20*%20z.x%20*%20z.y%29%20%2B%20p%3B%0A%7D%0A%0Afloat%20mask%20%3D%20step%28length%28z%29%2C%202.%29%3B%0Av.x%20%3D%20-p.y%2Flength%28p%29%20*%20%280.5%20-%20mask%29%3B%0Av.y%20%3D%20p.x%2Flength%28p%29%20*%20%280.5%20-%20mask%29%3B%0A%0A%0A%0A%0A%20%20return%20v%3B%0A%7D) which can be found [here](https://github.com/anvaka/fieldplay/blob/main/Awesome%20Fields.md).
