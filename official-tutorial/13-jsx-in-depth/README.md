# JSX In Depth

JSX sólo provee azucar sintactico sobre la función `React.createElement(component, props, ...children)`

```html
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

Compila en:

```javascript
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```
Si no hay hijos tb se puede usar la forma auto-closing

```html
<div className="sidebar" />
```

Compila en:

```javascript
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

El primer argumento determina el tipo de elemento React, si empieza por mayuscula indica que se está refiriendo a un componente React.

## Dot notation in JSX

Nos podemos referir a un componente React usando Dot Notation desde JSX.

```javascript
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

## Letra mayuscula para componentes React
Por convencion los componentes deben comenzar con letra mayuscula ya que JSX trata diferente los elementos con letra minuscula que trata como core elements de html y los de letra mayuscula que los trata como componentes React.

## Eligiendo el tipo en tiempo de ejecución

Imaginemos que queremos devolver un tipo especifico de componente dependiendo de un prop

Esto estaría mal, JSX no permite expresiones para especificar componentes
```javascript
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```

En lugar de ello hacemos nuestra asignación con una variable (que empiece por mayusculas!) y ya lo tenemos

```javascript
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## Props in JSX

### Javascript Expressions

Las expresiones entre `{}` serán evaluadas, en este ejemplo foo vale 10

```javascript
<MyComponent foo={1 + 2 + 3 + 4} />
```

Los if y los loops for no son expresiones en javascript y por lo tanto no se pueden usar entre `{}` en JSX, sin embargo los podemos usar en el codigo circundante.

```javascript
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```

### String Literals

Se puede pasar un string como un prop, al hacerlo su valor se convierte en HTML-unescaped, asi que estas expresiones son equivalentes.

```javascript
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />

<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />
```

### Props default to true

Si no le pasas valor a un atributo este es true por defecto, el comportamiento es igual que en HTML

```javascript
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

De todas formas no se recomienda pues podría confundirse con ES6 object shorthand {foo} = {foo: foo}

### Spread Attributes

```javascript
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

## Children in JSX
Las expresiones JSX que tienen hijos se convierten en un prop especial llamado props.children

props.children puede ser un literal, otros elementos ya sean core o componentes, javascript expressions, funciones.

En este ejemplo props.children sería el literal "Hello world!"

```html
<MyComponent>Hello world!</MyComponent>
```


Booleans, Null y Undefined son ignorados.

Este hecho se puede usar para renderizar condicionalmente componentes, por ejemplo:

```javascript
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

Aunque hay que tener cuidado por que 0 no se trata como falso.

```javascript
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
To fix this, make sure that the expression before && is always boolean:

<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```
