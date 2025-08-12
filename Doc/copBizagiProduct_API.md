# API CRUD para copBizagiProduct

## Descripción
Este documento describe las operaciones CRUD disponibles para el objeto `copBizagiProduct` en la API.

## Base URL
```
/api/v1/BizagiProducts
```

## Estructura del Modelo

```json
{
  "idCompany": "ec6cc118-7689-4afc-913c-ac431d4f7047",
  "idRegion": "29a76f1b-b986-4cd8-815f-2a425a923006",
  "idAzureSubscription": "436a8d15-2ecf-42e8-bdfd-c6234e989bd7",
  "idProductCategoryVersion": "08c15ca8-1ebb-4c4f-8a85-6eae7f9f9155",
  "idProduct": "AB8053E8-6B0D-4186-8C30-635F0E78914B",
  "Channel": "qa",
  "Security": "true",
  "idProductInstance": "e3e31ebb-2ac2-40fd-a39c-f9636a6496f5"
}
```

### Campos Requeridos:
- `idCompany`: ID de la compañía (referencia a copCompany)
- `idRegion`: ID de la región (referencia a CopRegion)
- `idAzureSubscription`: ID de la suscripción de Azure
- `idProductCategoryVersion`: ID de la versión de categoría de producto (referencia a CopRecipes)
- `idProduct`: ID del producto (referencia a CopProduct)
- `Channel`: Canal del producto (enum: 'qa', 'dev', 'prod', 'uat')
- `Security`: Configuración de seguridad (enum: 'true', 'false')
- `idProductInstance`: ID único de la instancia del producto (se genera automáticamente si no se proporciona)

## Endpoints

### 1. Crear Producto Bizagi
**POST** `/api/v1/BizagiProducts/Create`

**Body:**
```json
{
  "idCompany": "ec6cc118-7689-4afc-913c-ac431d4f7047",
  "idRegion": "29a76f1b-b986-4cd8-815f-2a425a923006",
  "idAzureSubscription": "436a8d15-2ecf-42e8-bdfd-c6234e989bd7",
  "idProductCategoryVersion": "08c15ca8-1ebb-4c4f-8a85-6eae7f9f9155",
  "idProduct": "AB8053E8-6B0D-4186-8C30-635F0E78914B",
  "Channel": "qa",
  "Security": "true"
}
```

**Respuesta exitosa (200):**
```json
{
  "_id": "...",
  "idCompany": "ec6cc118-7689-4afc-913c-ac431d4f7047",
  "idRegion": "29a76f1b-b986-4cd8-815f-2a425a923006",
  "idAzureSubscription": "436a8d15-2ecf-42e8-bdfd-c6234e989bd7",
  "idProductCategoryVersion": "08c15ca8-1ebb-4c4f-8a85-6eae7f9f9155",
  "idProduct": "AB8053E8-6B0D-4186-8C30-635F0E78914B",
  "Channel": "qa",
  "Security": "true",
  "idProductInstance": "e3e31ebb-2ac2-40fd-a39c-f9636a6496f5",
  "createdAt": "2025-01-13T10:00:00.000Z",
  "updatedAt": "2025-01-13T10:00:00.000Z"
}
```

### 2. Obtener Todos los Productos Bizagi
**GET** `/api/v1/BizagiProducts`

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "...",
    "idCompany": "ec6cc118-7689-4afc-913c-ac431d4f7047",
    "idRegion": "29a76f1b-b986-4cd8-815f-2a425a923006",
    "idAzureSubscription": "436a8d15-2ecf-42e8-bdfd-c6234e989bd7",
    "idProductCategoryVersion": "08c15ca8-1ebb-4c4f-8a85-6eae7f9f9155",
    "idProduct": "AB8053E8-6B0D-4186-8C30-635F0E78914B",
    "Channel": "qa",
    "Security": "true",
    "idProductInstance": "e3e31ebb-2ac2-40fd-a39c-f9636a6496f5",
    "createdAt": "2025-01-13T10:00:00.000Z",
    "updatedAt": "2025-01-13T10:00:00.000Z"
  }
]
```

### 3. Obtener Producto Bizagi por ID
**GET** `/api/v1/BizagiProducts/{idProductInstance}`

**Respuesta exitosa (200):**
```json
{
  "_id": "...",
  "idCompany": "ec6cc118-7689-4afc-913c-ac431d4f7047",
  "idRegion": "29a76f1b-b986-4cd8-815f-2a425a923006",
  "idAzureSubscription": "436a8d15-2ecf-42e8-bdfd-c6234e989bd7",
  "idProductCategoryVersion": "08c15ca8-1ebb-4c4f-8a85-6eae7f9f9155",
  "idProduct": "AB8053E8-6B0D-4186-8C30-635F0E78914B",
  "Channel": "qa",
  "Security": "true",
  "idProductInstance": "e3e31ebb-2ac2-40fd-a39c-f9636a6496f5",
  "createdAt": "2025-01-13T10:00:00.000Z",
  "updatedAt": "2025-01-13T10:00:00.000Z"
}
```

### 4. Actualizar Producto Bizagi
**PUT** `/api/v1/BizagiProducts/{idProductInstance}`

**Body:**
```json
{
  "Channel": "prod",
  "Security": "false"
}
```

**Respuesta exitosa (200):**
```json
{
  "_id": "...",
  "idCompany": "ec6cc118-7689-4afc-913c-ac431d4f7047",
  "idRegion": "29a76f1b-b986-4cd8-815f-2a425a923006",
  "idAzureSubscription": "436a8d15-2ecf-42e8-bdfd-c6234e989bd7",
  "idProductCategoryVersion": "08c15ca8-1ebb-4c4f-8a85-6eae7f9f9155",
  "idProduct": "AB8053E8-6B0D-4186-8C30-635F0E78914B",
  "Channel": "prod",
  "Security": "false",
  "idProductInstance": "e3e31ebb-2ac2-40fd-a39c-f9636a6496f5",
  "createdAt": "2025-01-13T10:00:00.000Z",
  "updatedAt": "2025-01-13T10:30:00.000Z"
}
```

### 5. Eliminar Producto Bizagi
**DELETE** `/api/v1/BizagiProducts/{idProductInstance}`

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Producto Bizagi eliminado correctamente"
}
```

### 6. Obtener Productos por Compañía
**GET** `/api/v1/BizagiProducts/company/{idCompany}`

### 7. Obtener Productos por Región
**GET** `/api/v1/BizagiProducts/region/{idRegion}`

### 8. Obtener Productos por Canal
**GET** `/api/v1/BizagiProducts/channel/{channel}`

## Códigos de Error

### 400 - Bad Request
```json
{
  "error": "El idCompany proporcionado no existe."
}
```

### 404 - Not Found
```json
{
  "error": "Producto Bizagi no encontrado"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Error interno del servidor"
}
```

## Validaciones

1. **Referencias existentes**: Todos los IDs de referencia (idCompany, idRegion, idProductCategoryVersion, idProduct) deben existir en sus respectivas colecciones.
2. **ID único**: El `idProductInstance` debe ser único en toda la colección.
3. **Enums**: Los campos `Channel` y `Security` solo aceptan valores específicos.
4. **Campos requeridos**: Todos los campos son obligatorios excepto `idProductInstance` que se genera automáticamente.

## Notas Importantes

- El `idProductInstance` es el identificador único principal del producto Bizagi.
- Todas las operaciones de creación y actualización validan que las referencias existan antes de proceder.
- Los timestamps (`createdAt` y `updatedAt`) se manejan automáticamente por Mongoose.
- La colección en MongoDB se llama `API_COP_BIZAGI_PRODUCTS`. 