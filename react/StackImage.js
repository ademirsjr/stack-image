import { ExtensionPoint } from 'vtex.render-runtime'
import Plus from 'vtex.styleguide/IconPlus'
import { Tooltip } from 'vtex.styleguide'
import { useSSR } from 'vtex.render-runtime'

function formatPosition(badge) {
    const left = (badge && badge.position && badge.position.x) * 100 || 0
    const bottom = (badge && badge.position && badge.position.y) * 100 || 0
    return {
        bottom: `${bottom}%`,
        left: `${left}%`
    }
}
const StackImage = ({ badges, children }) => {
    const isSSR = useSSR()
    return (<div className="absolute"><div style={{ position: "relative" }}>
        <div className="image" style={{ position: "relative" }}>
            <ExtensionPoint id="image" />
        </div>

        {!isSSR ? (<>
            {badges.map(badge => {
                const { bottom, left } = formatPosition(badge)
                return (
                    <div style={{ position: "absolute", bottom, left, zIndex: "100", transform: "translate(-50%,50%)" }}>
                        <Tooltip label={badge.description} trigger="hover">
                            <span className="c-on-base pointer"><Plus size="20"></Plus></span>
                        </Tooltip> </div>)
            })}
        </>) : null}

    </div></div>)
}
StackImage.schema = {
    title: 'Stack Image Editor',
    description: 'Criar Badges das imagens descritivas',
    type: 'object',
    properties: {
        badges: {
            type: 'array',
            title: 'Badge',
            items: {
                properties: {
                    __editorItemTitle: {
                        type: 'string',
                        title: 'Título do Item'
                    },
                    description: {
                        title: 'Description',
                        type: 'string',

                    },
                    position: {
                        title: 'Posição do Badge',
                        type: 'object',
                        properties: {
                            x: {
                                title: 'Posição X',
                                type: 'number',
                                minimum: 0,
                                maximum: 1
                            },
                            y: {
                                title: 'Posição Y',
                                type: 'number',
                                minimum: 0,
                                maximum: 1

                            }
                        }
                    }
                },
            },

        },
    },
}
export default StackImage