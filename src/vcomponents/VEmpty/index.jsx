import './index.scss'

const VEmpty = {
  name: 'VEmpty',
  props: {
    image: String,
    description: String
  },
  render() {
    const renderImage = () => {
      if (this.$slots.image) {
        return this.$slots.image()
      }

      return <img src={this.image}/>
    }

    const renderDescription = () => {
      const description = this.$slots.description
        ? this.$slots.description()
        : this.description

      if (description) {
        return <p class="v-empty__description">{description}</p>
      }
    }

    const renderBottom = () => {
      if (this.$slots.default) {
        return <div class="v-empty__bottom">{this.$slots.default()}</div>
      }
    }

    return (
      <div class="v-empty">
        <div class="v-empty__image">
          {renderImage()}
        </div>
        {renderDescription()}
        {renderBottom()}
      </div>
    )
  }
}

export default VEmpty