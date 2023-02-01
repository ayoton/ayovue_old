<template>
  <DataTable>
    <template #thead>
      <HeaderRow>
        <HeaderCol>ID</HeaderCol>
        <HeaderCol>Type</HeaderCol>
        <HeaderCol>Status</HeaderCol>
        <HeaderCol>Actions</HeaderCol>
      </HeaderRow>
    </template>
    <template #row="{ data }">
      <Row>
        <Col>{{ data.id }}</Col>
        <Col>{{ data.type }}</Col>
        <Col>{{ data.status }}</Col>
        <Col><button>Edit</button></Col>
      </Row>
    </template>
    <template #tfoot></template>
  </DataTable>
</template>
