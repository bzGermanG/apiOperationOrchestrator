# API Component Status

## Descripción
Este documento describe la funcionalidad de Component Status que se crea automáticamente cuando se crea un BizagiProduct.

## Funcionalidad Automática

### Creación Automática de Component Status
Cuando se crea un BizagiProduct a través del endpoint `/api/v1/Product/Create`, automáticamente se crean los componentes status correspondientes basados en el nombre del producto (`idProduct`).

### Mapeo de Productos a Componentes
Actualmente se soportan los siguientes mapeos:

- **RunBaselineRegion**: Crea 3 componentes (todos con `deployStatus: "IN_QUEUE"`)
  - RunBaselineRegion
  - StatusReport  
  - RunBaseline

- **RunBaseline**: Crea 2 componentes (todos con `deployStatus: "IN_QUEUE"`)
  - RunBaseline
  - StatusReport

- **StatusReport**: Crea 1 componente (con `deployStatus: "IN_QUEUE"`)
  - StatusReport

- **CustomerPortal**: Crea 9 componentes con diferentes estados:
  - CustomerPortal (`IN_QUEUE`)
  - GenAI (`IN_QUEUE`)
  - OperationManager (`IN_QUEUE`)
  - Platform (`CREATING`)
  - Catalog (`CONFIGURATION_ERROR`)
  - UserRegister (`CONFIGURATION_ERROR`)
  - Accounts2 (`CONFIGURATION_ERROR`)
  - Accounts (`CREATED`)
  - General (`CONFIGURATION_ERROR`)

- **Otros productos**: Crea 1 componente con el mismo nombre del producto (con `deployStatus: "IN_QUEUE"`)

## Estructura del Component Status

```json
{
  "productName": "RunBaselineRegion",
  "transactionId": "df1cbd13-d47f-4843-95d9-bd2866d4da1e",
  "idProductInstance": "eb60e713-cd09-48f0-87dc-67317fe9bd3f",
  "deployStatus": "IN_QUEUE"
}
```

### Campos:
- `productName`: Nombre del componente
- `transactionId`: ID de transacción (mismo que el BizagiProduct)
- `idProductInstance`: ID de la instancia del producto (mismo que el BizagiProduct)
- `deployStatus`: Estado del despliegue (por defecto: "IN_QUEUE")

## Endpoints Disponibles

### Component Status API
Base URL: `/api/v1/ComponentStatus`

#### Crear un componente status
**POST** `/Create`
```json
{
  "productName": "RunBaselineRegion",
  "transactionId": "df1cbd13-d47f-4843-95d9-bd2866d4da1e",
  "idProductInstance": "eb60e713-cd09-48f0-87dc-67317fe9bd3f",
  "deployStatus": "IN_QUEUE"
}
```

#### Crear múltiples componentes status
**POST** `/CreateMultiple`
```json
[
  {
    "productName": "RunBaselineRegion",
    "transactionId": "df1cbd13-d47f-4843-95d9-bd2866d4da1e",
    "idProductInstance": "eb60e713-cd09-48f0-87dc-67317fe9bd3f",
    "deployStatus": "IN_QUEUE"
  },
  {
    "productName": "StatusReport",
    "transactionId": "df1cbd13-d47f-4843-95d9-bd2866d4da1e",
    "idProductInstance": "eb60e713-cd09-48f0-87dc-67317fe9bd3f",
    "deployStatus": "IN_QUEUE"
  }
]
```

#### Obtener todos los componentes status
**GET** `/GetAll`

#### Obtener componentes status por idProductInstance
**GET** `/GetByProductInstance/:idProductInstance`

#### Obtener un componente status por ID
**GET** `/GetById/:id`

#### Actualizar un componente status
**PUT** `/Update/:id`

#### Eliminar un componente status
**DELETE** `/Delete/:id`

### BizagiProduct API (Nuevo endpoint)

#### Obtener componentes status de un producto específico
**GET** `/api/v1/Product/:idProductInstance/ComponentStatuses`

### Status API (Nuevo endpoint)

#### Obtener componentes status por IdProductInstance e IdCompany
**GET** `/api/v1/Status/IdProductInstance/:idProductInstance/IdCompany/:idCompany`

**Ejemplo:**
```
GET /api/v1/Status/IdProductInstance/50c76c72-3294-4e69-948b-204535ccca34/IdCompany/a4704ac3-e60d-4982-951c-275465bfa598
```

**Respuesta:**
```json
[
  {
    "productName": "CustomerPortal",
    "transactionId": "5b27b0ba-2ab2-4b4c-83d1-03e38b1af619",
    "idProductInstance": "50c76c72-3294-4e69-948b-204535ccca34",
    "deployStatus": "IN_QUEUE"
  },
  {
    "productName": "GenAI",
    "transactionId": "5b27b0ba-2ab2-4b4c-83d1-03e38b1af619",
    "idProductInstance": "50c76c72-3294-4e69-948b-204535ccca34",
    "deployStatus": "IN_QUEUE"
  }
]
```

**Validaciones:**
- Verifica que el BizagiProduct existe con la combinación de `idProductInstance` e `idCompany`
- Retorna error 404 si no se encuentra el producto para esa combinación
- Retorna todos los componentes status asociados al `idProductInstance`

## Estados de Deploy Status

Los posibles valores para `deployStatus` son:
- `IN_QUEUE`: En cola (estado por defecto)
- `CREATED`: Creado
- `UPDATING`: Actualizando
- `ERROR`: Error
- `INFRASTRUCTURE_ERROR`: Error de infraestructura
- `CONFIGURATION_ERROR`: Error de configuración

## Ejemplo de Uso

### Ejemplo 1: RunBaselineRegion
1. Crear un BizagiProduct con `idProduct: "RunBaselineRegion"`
2. Automáticamente se crearán 3 componentes status:
   - RunBaselineRegion
   - StatusReport
   - RunBaseline
3. Todos tendrán el mismo `transactionId` e `idProductInstance`
4. Todos tendrán `deployStatus: "IN_QUEUE"`

### Ejemplo 2: CustomerPortal
1. Crear un BizagiProduct con `idProduct: "CustomerPortal"`
2. Automáticamente se crearán 9 componentes status con diferentes estados:
   - CustomerPortal, GenAI, OperationManager (`IN_QUEUE`)
   - Platform (`CREATING`)
   - Catalog, UserRegister, Accounts2, General (`CONFIGURATION_ERROR`)
   - Accounts (`CREATED`)
3. Todos tendrán el mismo `transactionId` e `idProductInstance`

## Manejo de Errores

Si la creación de componentes status falla después de crear el BizagiProduct, el sistema:
1. Elimina automáticamente el BizagiProduct creado
2. Retorna un error 500 con el mensaje de error
3. Mantiene la consistencia de datos 