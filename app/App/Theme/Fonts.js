import { Colors } from 'App/Theme'

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  input: 18,
  small: 12,
  regular: 17,
  medium: 20,
}

const style = {
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  small: {
    fontSize: size.small,
  },
  normal: {
    fontSize: size.regular,
  },
  medium: {
    fontSize: size.medium,
  },
  title: {
    color: Colors.title,
    fontSize: size.regular,
  },
}

export default {
  size,
  style,
}
