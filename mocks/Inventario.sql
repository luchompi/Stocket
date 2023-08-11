INSERT INTO "Inventario_marca" (name, description, created_at) VALUES
    ('Marca A', 'Descripción de la Marca A', '2023-08-11 12:00:00'),
    ('Marca B', 'Descripción de la Marca B', '2023-08-11 12:15:00'),
    ('Marca C', 'Descripción de la Marca C', '2023-08-11 12:30:00'),
    ('Marca D', 'Descripción de la Marca D', '2023-08-11 12:45:00'),
    ('Marca E', 'Descripción de la Marca E', '2023-08-11 13:00:00');

INSERT INTO "Inventario_categoria" (name, description, created_at) VALUES
    ('Categoría 1', 'Descripción de la Categoría 1', '2023-08-11 12:00:00'),
    ('Categoría 2', 'Descripción de la Categoría 2', '2023-08-11 12:15:00'),
    ('Categoría 3', 'Descripción de la Categoría 3', '2023-08-11 12:30:00'),
    ('Categoría 4', 'Descripción de la Categoría 4', '2023-08-11 12:45:00'),
    ('Categoría 5', 'Descripción de la Categoría 5', '2023-08-11 13:00:00');

INSERT INTO "Inventario_referencia" (marca_id, categoria_id, timestamps) VALUES
    (1, 1, '2023-08-11 12:00:00'),
    (2, 1, '2023-08-11 12:15:00'),
    (3, 2, '2023-08-11 12:30:00'),
    (4, 2, '2023-08-11 12:45:00'),
    (5, 3, '2023-08-11 13:00:00');


INSERT INTO "Inventario_elemento" (placa, referencia_id, modelo, serial, estado, IP, MAC, proveedor_id, created_at, delete_on, created_by) VALUES
    (1, 1, 'Modelo 1', 'Serial-123', 'Asignado', '192.168.1.1', '00:11:22:33:44:55', 1, '2023-08-11 12:00:00', NULL, 'admin'),
    (2, 2, 'Modelo 2', 'Serial-456', 'Por asignar', NULL, 'AA:BB:CC:DD:EE:FF', 2, '2023-08-11 12:15:00', NULL, 'admin'),
    (3, 3, 'Modelo 1', 'Serial-789', 'En uso', '192.168.1.2', '11:22:33:44:55:66', 1, '2023-08-11 12:30:00', NULL, 'admin'),
    (4, 4, 'Modelo 3', 'Serial-012', 'Por asignar', NULL, 'BB:CC:DD:EE:FF:00', 3, '2023-08-11 12:45:00', NULL, 'admin'),
    (5, 5, 'Modelo 2', 'Serial-345', 'Asignado', '192.168.1.3', '22:33:44:55:66:77', 2, '2023-08-11 13:00:00', NULL, 'admin');