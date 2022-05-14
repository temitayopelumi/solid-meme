const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const createItem = async (req, res) => {
  const {
    body: { name, quantity },
  } = req

  if ((quantity === '') || (!quantity)) {
    throw new BadRequestError('Quantity is required')
  }

  if (name === '' || (!name)) {
    throw new BadRequestError('Name are required')
  }

  const created_item = await prisma.item.create({ data: req.body })
  res.status(StatusCodes.CREATED).json({ message: "Item created successfully", data: { name: created_item.name } })
}

const updateItem = async (req, res) => {

  const id = req.params.id
  const name = req.body.name
  const quantity = req.body.quantity

  if (name === '' || quantity === '') {
    throw new BadRequestError('fields are required')

  }

  const updated_item = await prisma.item.update({
    where: { id: Number(id) },
    data: { name: name, quantity: quantity },
  })

  res.status(StatusCodes.OK).json({ message: "Success", data: updated_item.name })

}

const getAllItems = async (req, res) => {
  const items = await prisma.item.findMany({
    where: { deleted: false }, select: {
      quantity: true,
      name: true,
      id: true
    },
  })
  res.status(StatusCodes.OK).json({ message: "Success", data: items })
}

const getItem = async (req, res) => {
  const id = req.params.id
  const item = await prisma.item.findFirst({
    where: {
      id: Number(id),
    },
  })
  if (!item) {
    throw new BadRequestError('Item not found')
  }
  res.status(StatusCodes.OK).json({ message: "Successs", data: item })
}

const deleteItem = async (req, res) => {
  const id = req.params.id
  const comment = req.body.comment
  if (comment === '' || (!comment)) {
    throw new BadRequestError('Comment is required for deletion')
  }

  const item = await prisma.item.findFirst({
    where: {
      id: Number(id),
    }
  })

  if (item.deleted) {
    throw new BadRequestError('Item has been deleted')
  }

  const updated_item = await prisma.item.update({
    where: { id: Number(id) },
    data: { deleted: true, comment: comment },
  })
  res.status(StatusCodes.OK).json({ message: "Item deleted", data: { name: updated_item.name, comment: updated_item.comment } })

}

const restoreItem = async (req, res) => {
  const id = req.params.id
  const item = await prisma.item.findFirst({
    where: {
      id: Number(id),
    }
  })

  if (!item.deleted) {
    throw new BadRequestError('Item is avaliable in the inventory')
  }
  const updated_item = await prisma.item.update({
    where: { id: Number(id) },
    data: { deleted: false },
  })
  res.status(StatusCodes.OK).json({ message: "Item restored", data: { name: updated_item.name } })

}

module.exports = { getAllItems, getItem, updateItem, createItem, restoreItem, deleteItem }