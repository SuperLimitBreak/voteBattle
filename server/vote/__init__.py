from pyramid.config import Configurator
import pyramid.request
import pyramid.events
from pyramid.session import SignedCookieSessionFactory  # TODO: should needs to be replaced with an encrypted cookie or a hacker at an event may be able to intercept other users id's

from libs.misc import convert_str_with_type, extract_subkeys, json_serializer
from libs.pyramid_helpers.auto_format import append_format_pattern

from vote.templates import helpers as template_helpers

import logging
log = logging.getLogger(__name__)


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)

    # Register Aditional Includes ---------------------------------------------
    config.include('pyramid_mako')  # The mako.directories value is updated in the scan for addons. We trigger the import here to include the correct folders.

    # Settings -----------------------------------------------------------------
    #   Parse/Convert setting keys that have specifyed datatypes
    for key in config.registry.settings.keys():
        config.registry.settings[key] = convert_str_with_type(config.registry.settings[key])

    # Session Manager ----------------------------------------------------------

    session_settings = extract_subkeys(config.registry.settings, 'session.')
    session_factory = SignedCookieSessionFactory(serializer=json_serializer, **session_settings)
    config.set_session_factory(session_factory)

    # WebSocket ----------------------------------------------------------------

    from libs.multisocket.auth_echo_server import AuthEchoServerManager
    def authenicator(key):
        """
        Only authenticated keys can connect to the websocket with write access
        The first message sent MUST be a valid session key or the client is disconnected
        Clients can still connect and read messages
        """
        session_data = session_factory(pyramid.request.Request({'HTTP_COOKIE':'{0}={1}'.format(config.registry.settings['session.cookie_name'],key)}))
        #return session_data and session_data.get('admin')
        return True
    socket_manager = AuthEchoServerManager(
        authenticator=authenicator,
        websocket_port=config.registry.settings['vote.port.websocket'],
        tcp_port=config.registry.settings.get('vote.port.tcp'),
    )
    config.registry['socket_manager'] = socket_manager
    socket_manager.start()

    # Static Routes ------------------------------------------------------------

    config.add_static_view('static', 'static')#, cache_max_age=3600)
    config.add_static_view('ext', '../externals/static')#, cache_max_age=3600)

    # Routes -------------------------------------------------------------------

    config.add_route('mobile_client_select', append_format_pattern('/'))
    config.add_route('mobile_client'       , append_format_pattern('/mobile_client/{pool_id}'))
    config.add_route('new_vote_pool'       , append_format_pattern('/api/'))
    config.add_route('frame'               , append_format_pattern('/api/{pool_id}'))
    config.add_route('vote'                , append_format_pattern('/api/{pool_id}/vote'))
    config.add_route('previous_frames'     , append_format_pattern('/api/{pool_id}/previous_frames'))
    config.add_route('join'                , append_format_pattern('/api/{pool_id}/join'))


    # Events -------------------------------------------------------------------
    config.add_subscriber(add_template_helpers_to_event, pyramid.events.BeforeRender)

    # Init ---------------------------------------------------------------------
    #from vote.lib.vote import VotePool
    #VotePool('default')

    # Return -------------------------------------------------------------------
    config.scan(ignore='.tests')
    return config.make_wsgi_app()


def add_template_helpers_to_event(event):
    event['h'] = template_helpers
