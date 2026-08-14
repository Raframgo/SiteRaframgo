# SSO entre RaframGo y sus productos — arquitectura (no implementado)

Este documento describe cómo se construiría el inicio de sesión único (SSO)
entre los productos del ecosistema RaframGo cuando exista más de un
producto. Es una guía de arquitectura, no código funcional: hoy no hay una
sesión compartida real entre aplicaciones (decisión explícita, ver
"Por qué no ahora").

## Estado actual

- El portal corporativo (este proyecto) **no tiene autenticación de
  visitantes** y nunca la tendrá — no es un producto, es el sitio de
  presentación de la marca (ver spec, sección 3). El único uso de Firebase
  Auth aquí es `/admin`, con el mismo rol `admins/{uid}` que ya usa aMerkar.
- aMerkar tiene su propio inicio de sesión (correo/contraseña y Google),
  independiente del portal.
- Portal y aMerkar **ya comparten el mismo proyecto Firebase**
  (`amerkar-45d55`), incluida la misma configuración pública de Firebase
  Auth. Esto es lo que hace que un futuro SSO sea más barato de construir:
  la identidad ya vive en un solo lugar, solo falta el mecanismo para
  trasladar una sesión de un producto a otro.

## Por qué no se implementa una sesión compartida real ahora

1. **No hay un segundo producto todavía.** SSO solo tiene sentido entre dos
   o más aplicaciones. Construir el mecanismo de traspaso de sesión sin
   nada contra qué probarlo es trabajo especulativo.
2. **No hay Cloud Functions (plan Blaze).** El patrón seguro estándar de
   Firebase para SSO entre dominios (tokens personalizados firmados en el
   servidor) requiere una función en la nube que verifique el ID token del
   producto de origen y emita un token personalizado para el producto de
   destino. Sin backend propio, no hay dónde emitir ese token de forma
   segura.

Cuando ambas condiciones dejen de aplicarse (exista un segundo producto y
el proyecto tenga Cloud Functions), este documento es el punto de partida
para implementarlo.

## Arquitectura propuesta

### Identidad central

Firebase Authentication, en el proyecto compartido `amerkar-45d55`, sigue
siendo la única fuente de identidad para todos los productos RaframGo. Esto
ya es así hoy — no cambia.

### Traspaso de sesión entre dominios (a construir)

Los tokens de sesión de Firebase Auth no se comparten automáticamente entre
dominios distintos (aMerkar y un futuro Producto 2 corren en orígenes
diferentes). El mecanismo propuesto:

1. La persona inicia sesión normalmente en el Producto A (por ejemplo,
   aMerkar).
2. Cuando decide entrar al Producto B desde un enlace del portal o desde
   dentro del Producto A, el cliente pide su ID token actual (
   `getIdToken()`) y lo envía a una Cloud Function `mintCrossAppToken`.
3. La función verifica el ID token con el Admin SDK, confirma que
   corresponde a un usuario válido, y emite un **custom token** de Firebase
   Auth de un solo uso y corta duración, ligado a ese `uid`.
4. El cliente es redirigido al Producto B con ese custom token (por
   ejemplo, como parámetro de una URL de retorno de un solo uso, nunca en
   `localStorage` ni en un cookie legible por JavaScript de terceros).
5. El Producto B llama a `signInWithCustomToken(token)` y queda
   autenticado con la misma identidad, sin pedir contraseña de nuevo.

Este es el patrón recomendado por Firebase para SSO entre aplicaciones que
comparten proyecto pero no dominio, y es el que debe implementarse cuando
existan las dos condiciones de la sección anterior.

### Dónde encaja el portal

El portal **no participa en el traspaso de sesión** — no tiene sesión de
visitante que trasladar. Su único rol en un futuro SSO sería, como mucho,
ofrecer un punto de entrada único ("Entrar a RaframGo" en vez de "Entrar a
aMerkar" / "Entrar a Producto 2") que redirija al flujo de arriba, pero la
autenticación real siempre ocurre entre los productos, nunca en el portal.

## Qué NO hacer mientras tanto

- No intentar compartir `localStorage` o cookies entre dominios distintos
  para simular sesión compartida: no funciona por las restricciones de
  mismo origen del navegador y daría una falsa sensación de seguridad.
- No guardar tokens de sesión en el portal: el portal no tiene superficie
  de autenticación de visitantes y no debe empezar a tenerla por esto.
- No construir la Cloud Function de traspaso de tokens antes de tener un
  segundo producto real contra el cual probarla.

## Disparador para retomar este trabajo

Retomar esta implementación cuando se cumplan ambas condiciones:

1. Exista un segundo producto RaframGo en producción (o a punto de
   lanzarse).
2. El proyecto Firebase esté en plan Blaze con Cloud Functions habilitado.
