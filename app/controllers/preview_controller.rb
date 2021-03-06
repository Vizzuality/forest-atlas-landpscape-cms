class PreviewController < ApplicationController
  include PermissionsHelper

  before_action :load_site
  before_action :set_user_gon

  def index
    gon.header_login_enabled = params[:header_login_enabled]
    gon.header_country_colours = params[:'header-country-colours']
    respond_to do |format|
      format.html { render :index }
    end
  end

  def compile
    CompilePreviewWorker.perform_async(
      current_user.id,
      @site.id,
      site_settings_params.to_json
    )

    head :ok
  end

  private

  def load_site
    @site = Site.find_by(slug: params[:site_slug])
  end

  def site_settings_params
    params.require(:site_settings).permit(
      :color,
      :content_width,
      :content_font,
      :heading_font,
      :cover_size,
      :cover_text_alignment,
      :header_separators,
      :header_background,
      :header_transparency,
      :header_login_enabled,
      :footer_background,
      :footer_text_color,
      :footer_links_color,
      :'header-country-colours'
    )
  end
end
