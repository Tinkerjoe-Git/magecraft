  <Card
        className="magic-card"
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOver}
      >
        <CardContent>
          <Card 
          <CardHeader
            as="a"
            floated="left"
            onClick={this.handleClick}
            className="white-text"
          >
            {name}
          </CardHeader>
          <Card.Meta className="white-text">
            <i>{userName === 'admin' ? creator : userName}</i>
          </Card.Meta>
          <List>
            <List.Item>
              <List.Header className="white-text">Format</List.Header>
              {formatName}
            </List.Item>
          </List>
        </CardContent>
        <Card.Content extra className="white-text">
          {dateFormater(updatedAt)}
          {this.props.match.path === '/:username/decks' &&
            this.state.mouseOver && (
              <FormLabel
                as="a"
                name="delete"
                onClick={this.toggleDestroyModal}
                attached="top right"
                icon="delete"
              />
            )}
        </Card.Content>
        <DeleteModal
          open={this.state.destroy}
          handleDelete={this.handleDelete}
          toggle={this.toggleDestroyModal}
          type="deck"
        />
      </Card>
    )
  }
}