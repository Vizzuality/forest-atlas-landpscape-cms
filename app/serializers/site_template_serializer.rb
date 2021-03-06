# == Schema Information
#
# Table name: site_templates
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class SiteTemplateSerializer < ActiveModel::Serializer
  attributes :id, :name
end
