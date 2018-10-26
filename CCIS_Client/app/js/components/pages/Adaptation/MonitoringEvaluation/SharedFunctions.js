import React from 'react'
import { Button, Fa } from 'mdbreact'

export function listAuthors(metaAuthors, removeCallback) {
  let authors = []

  metaAuthors.forEach(a => {
    let index = metaAuthors.indexOf(a)
    authors.push(
      <p key={a} style={{ marginBottom: "0px" }}>
        {index + 1}) {a}
        <Button
          size="sm"
          rounded
          color="danger"
          style={{
            margin: "0px 0px 3px 7px",
            width: "30px",
            paddingLeft: "9px",
            paddingRight: "10px"
          }}
          onClick={ () => {
            metaAuthors.splice(index, 1)
            removeCallback(metaAuthors)
          }}
        >
          <Fa size="lg" icon="trash" />
        </Button>
      </p>
    )
  })

  return authors
}